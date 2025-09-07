#!/usr/bin/env node
const fs = require('fs')

async function getAllContributors(repo) {
    let results = []
    let page = 1

    while (true) {
        const url = `https://api.github.com/repos/${repo}/contributors?per_page=100&page=${page}`
        const data = { headers: { Accept: 'application/vnd.github+json' } }

        const response = await fetch(url, data)
        if (!response.ok) break

        const contributors = await response.json()
        // console.log('contributors:', contributors)
        if (!contributors.length) break

        const filtered = contributors
            .filter((c) => c.type === 'User')
            .map((c) => ({
                login: c.login,
                avatar_url: c.avatar_url,
                contributions: c.contributions,
            }))
        // console.log('filtered:', filtered)

        results.push(...filtered)
        page++
        await new Promise((resolve) => setTimeout(resolve, 250))
    }

    return results
}

const repo = process.argv[2]
const file = process.argv[3] ?? '.vitepress/contributors.json'
console.log(`get-contributors - repo: ${repo} - file: ${file}`)
if (!repo || !file) {
    console.error('Usage: npm run get-contributors user/repo')
    process.exit(1)
}

getAllContributors(repo)
    .then((data) => {
        // console.log('data:', data)
        fs.writeFileSync(file, JSON.stringify(data), 'utf8')
    })
    .catch(console.error)

import { useEffect, useState } from 'react';

const CACHE_KEY = 'github-stats-cache';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

function useGithubStats(workData) {

    const [githubStats, setGithubStats] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchGithubStats = async () => {

            /*
            -------------------------
            CHECK CACHE
            -------------------------
            */

            const cached = localStorage.getItem(CACHE_KEY);

            if (cached) {

                const parsed = JSON.parse(cached);

                const isExpired =
                    Date.now() - parsed.timestamp > CACHE_DURATION;

                if (!isExpired) {

                    setGithubStats(parsed.data);
                    setLoading(false);

                    return;
                }
            }

            /*
            -------------------------
            FETCH FRESH DATA
            -------------------------
            */

            const stats = {};

            try {

                await Promise.all(

                    workData.map(async (work) => {

                        if (!work.repo) return;

                        const match = work.repo.match(
                            /github\.com\/([^/]+)\/([^/]+)/
                        );

                        if (!match) return;

                        const owner = match[1];
                        const repo = match[2];

                        /*
                        -------------------------
                        REPO DATA
                        -------------------------
                        */

                        const repoRes = await fetch(
                            `https://api.github.com/repos/${owner}/${repo}`
                        );

                        if (repoRes.status === 403 || repoRes.status >= 400) {
                            // rate limit or forbidden → fallback safe values
                            stats[work.path] = {
                                stars: 0,
                                forks: 0,
                                watchers: 0,
                                issues: 0,
                                commits: 0,
                                loc: 0,
                                updated: 'N/A'
                            };
                            return;
                        }

                        const repoData = await repoRes.json();

                        /*
                        -------------------------
                        COMMIT COUNT
                        -------------------------
                        */

                        const commitsRes = await fetch(
                            `https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`
                        );

                        let commits = 0;

                        const linkHeader =
                            commitsRes.headers.get('link');

                        if (linkHeader) {

                            const match =
                                linkHeader.match(
                                    /page=(\d+)>; rel="last"/
                                );

                            if (match) {
                                commits = parseInt(match[1]);
                            }

                        } else {

                            const commitsData =
                                await commitsRes.json();

                            commits = commitsData.length;
                        }

                        /*
                        -------------------------
                        LANGUAGE / LOC
                        -------------------------
                        */

                        const langRes = await fetch(
                            `https://api.github.com/repos/${owner}/${repo}/languages`
                        );

                        const langData = await langRes.json();

                        const totalBytes =
                            Object.values(langData)
                                .reduce((a, b) => a + b, 0);

                        const estimatedLOC =
                            Math.round(totalBytes / 35);

                        stats[work.path] = {

                            stars: repoData.stargazers_count,
                            forks: repoData.forks_count,
                            watchers: repoData.watchers_count,
                            issues: repoData.open_issues_count,

                            commits,
                            loc: estimatedLOC,

                            updated: new Date(
                                repoData.updated_at
                            ).toLocaleDateString()
                        };
                    })
                );

                /*
                -------------------------
                SAVE CACHE
                -------------------------
                */

                localStorage.setItem(
                    CACHE_KEY,
                    JSON.stringify({
                        timestamp: Date.now(),
                        data: stats
                    })
                );

                setGithubStats(stats);

            } catch(err) {

                console.error(err);

            } finally {

                setLoading(false);
            }
        };

        fetchGithubStats();

    }, [workData]);

    return {
        githubStats,
        loading
    };
}

export default useGithubStats;
/** Your GitHub username (lowercase), e.g. setegnworku */
const ADMIN_GITHUB_USERNAME = (
  import.meta.env.VITE_ADMIN_GITHUB_USERNAME || 'setegnworku'
).toLowerCase()

export function getGitHubUsername(user) {
  return (user?.user_metadata?.user_name || user?.user_metadata?.preferred_username || '')
    .toLowerCase()
}

export function isAdminUser(user) {
  if (!user) return false
  return getGitHubUsername(user) === ADMIN_GITHUB_USERNAME
}

export function getAdminGitHubUsername() {
  return ADMIN_GITHUB_USERNAME
}

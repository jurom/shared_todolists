export function gravatarSrc({hash, size, defaultImage = 'wavatar'}) {
  const query = []

  if (size) query.push('s=' + size)
  query.push('d=' + encodeURIComponent(defaultImage))

  return 'https://www.gravatar.com/avatar/' + hash + '?' + query.join('&')
}

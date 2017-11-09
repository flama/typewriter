export default (href) => {
  const hrefHasHttp = ~href.search(/^https?:\/\//i)

  return hrefHasHttp ? href : `http://${href}`
}

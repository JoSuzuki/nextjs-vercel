const formatDate = (date: string): string => {
  const jsDate = new Date(date)

  return `${jsDate.getDay()}/${jsDate.getMonth() + 1}/${jsDate.getFullYear()}`
}

export default formatDate

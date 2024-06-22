function DateConverter(date) {
    const modifiedDate=new Date(date).toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')

  return modifiedDate;
}

export default DateConverter
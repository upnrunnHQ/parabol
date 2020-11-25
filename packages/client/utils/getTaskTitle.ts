const getTaskTitle = (plaintextContent: string) => {
  return plaintextContent.split('\n')[0]
}
export default getTaskTitle

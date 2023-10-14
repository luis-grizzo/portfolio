export const colors = ['red', 'yellow', 'lime', 'blue', 'pink']

export const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)]
}

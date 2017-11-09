export default (node, boundingBox) => {
  const numOfTicks = 25
  const distance = 10

  let currentTick = 0
  let positionY = 0

  const setNodeStyle = ({ positionY, positionZ }) => {
    node.style.transform = `translate3d(0, ${positionY}px, ${positionZ}px)`
  }

  const nodeHasPositionY = (positionY) => {
    return ~node.style.transform.search(`^translate3d.0px, -${positionY}`)
  }

  const animateUpCallback = () => {
    if (currentTick >= numOfTicks) return

    currentTick += 1
    positionY += -distance / numOfTicks
    const positionZ = -positionY / distance

    setNodeStyle({ positionY, positionZ })

    setTimeout(animateUpCallback, 1)
  }

  const animateDownCallback = () => {
    if (currentTick >= numOfTicks) return

    currentTick += 1
    positionY += distance / numOfTicks
    const positionZ = positionY / distance

    setNodeStyle({ positionY, positionZ })

    setTimeout(animateDownCallback, 1)
  }

  const isNearTopOfScreen = () => {
    return boundingBox.top < 50
  }


  if (isNearTopOfScreen()) {
    const finalPosition = boundingBox.height + node.offsetHeight - distance

    // If already showing, don't animate
    if (nodeHasPositionY(finalPosition)) return

    positionY = finalPosition
    animateDownCallback()
  } else {
    const finalPosition = distance / 2

    // If already showing, don't animate
    if (nodeHasPositionY(finalPosition)) return

    positionY = finalPosition
    animateUpCallback()
  }
}

export function resetBounceAnimation(node) {
  node.style.transform = ''
}

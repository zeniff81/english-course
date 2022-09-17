import React from 'react'

const classes = {
  container: {
    background: '#00acee',
    color: 'yellow',
    width: "100%",
    height: "2rem", 
    position: 'absolute',
    bottom: 0,
    display: 'flex', 
    alignItems: 'center',
    justifyContent: 'center',
  }
}

function DummyRating() {
  return (
    <div style={classes.container}>* * * * *</div>
  )
}

export default DummyRating
const Message = ({message}) => {
  return (
    <div style={styles.container}>
      <span style={styles.text}>{message}</span>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
    border: '1px solid gray',
    padding: '10px',
    margin: '0 auto',
    maxWidth: '60%',
  },
  text: {
    color: 'black',
    fontSize: '36px',
    fontWeight: 'bold',
  },
};


export default Message
import styles from './button.module.css'

const Button = ({ icon, bgColor='#CBD715', textColor='black', caption, onClick, style, className, disabled }) => {
  
  return (
    <button      
      className={[styles.container, className, disabled && styles.buttondisabled].join(' ')}
      style={{ background: bgColor, color: textColor, ...style }}
      onClick={onClick}
      data-test={caption}
      >
      {icon && <div className={styles.buttonicon}>{icon}</div>}      
    </button>
  )
}

export default Button
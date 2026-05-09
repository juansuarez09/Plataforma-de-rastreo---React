import styles from './Card.module.css';

const Card = ({ children, className = '', style = {} }) => (
  <div className={`${styles.card} ${className}`} style={style}>
    {children}
  </div>
);

export default Card;

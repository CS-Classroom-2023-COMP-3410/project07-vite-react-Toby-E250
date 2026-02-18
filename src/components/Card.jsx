function Card({ title, description, imageUrl, actions, children }) {
    return (
      <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', width: '250px' }}>
        {imageUrl && <img src={imageUrl} alt={title} style={{ width: '100%', borderRadius: '4px' }} />}
        <h3>{title}</h3>
        <p>{description}</p>
        {children}
        {actions && actions.map((action, i) => (
          <button
            key={i}
            onClick={action.onClick}
            disabled={action.disabled}
            style={{
              backgroundColor: action.variant === 'primary' ? '#007bff' :
                               action.variant === 'secondary' ? '#6c757d' :
                               action.variant === 'danger' ? '#dc3545' : '#28a745',
              color: '#fff',
              border: 'none',
              padding: '8px 12px',
              marginRight: '5px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {action.label}
          </button>
        ))}
      </div>
    );
  }
  
  export default Card;
  
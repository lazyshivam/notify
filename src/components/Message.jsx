import './index.css'
const Message = ({ notification }) => {
    return (
      <>
        <div id="notificationHeader">
          {/* image is optional */}
          {notification.image && (
            <div id="imageContainer">
              <img src={notification.image} width={100} alt="logo" />
            </div>
          )}
          <span>{notification.title}</span>
        </div>
        <div id="notificationBody">{notification.body}</div>
      </>
    );
  };
  
  export default Message;
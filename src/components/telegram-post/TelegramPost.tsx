import React, { useState, useEffect } from 'react';
import styles from './telegram-post.module.css';

interface TelegramPostProps {
  channelName: string;
  channelUrl: string;
}

const TelegramPost: React.FC<TelegramPostProps> = ({ channelName, channelUrl }) => {
  const [postContent, setPostContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Симулируем загрузку последнего поста
    // В реальном приложении здесь был бы запрос к API Telegram
    setIsLoading(true);
    setTimeout(() => {
      setPostContent('A nomadic designer’s blog. Stories about design and life. Sometimes funny.. ');
      setIsLoading(false);
    }, 500);
  }, []);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <div className={styles.telegramPost}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          <img src="/img/Nomadic.png" alt="Nomadic Eye" />
        </div>
        <div className={styles.channelInfo}>
          <h4 className={styles.channelName}>{channelName}</h4>
        </div>
      </div>
      <div className={styles.content}>
        {isLoading ? (
          <div className={styles.loading}>Загрузка...</div>
        ) : (
          <p className={styles.postText}>{truncateText(postContent, 200)}</p>
        )}
      </div>
    </div>
  );
};

export default TelegramPost;
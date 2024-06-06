import React, { useState, useEffect } from 'react';
import { getImages } from '../../apis/media';

const RichTextDisplay = ({ data }) => {
  // Lưu images
  const [images, setImages] = useState([]);
  // GET images
  useEffect(() => {
    (async () => {
      try {
        const response = await getImages();
        setImages(response.data.docs);
      } catch (error) {
        console.error('Error fetching registrations:', error);
      }
    })();
  }, []);

  if (!data) return null;

  const renderText = (textObj) => {
    let text = textObj.text;
    if (textObj.bold) text = <b>{text}</b>;
    if (textObj.italic) text = <i>{text}</i>;
    if (textObj.underline) text = <u>{text}</u>;
    if (textObj.strikethrough) text = <s>{text}</s>;
    if (textObj.code) text = <code>{text}</code>;
    if (textObj.text === '') text = <br />;
    return text;
  };

  const renderChildren = (children) => {
    return children.map((child, index) => {
      // Kiểm tra trường hợp đối tượng không có type mà chỉ có children là 1 Array các text
      if (!child.type && child.children) {
        return <div key={index}>{renderChildren(child.children)}</div>;
      }

      // Handle các trường hợp đối tượng trong data trả về có type
      switch (child.type) {
        case 'li':
          return <li key={index}>{renderChildren(child.children)}</li>;
        case 'link':
          return (
            <a
              href={child.url}
              target={child.newTab ? '_blank' : '_self'}
              key={index}
            >
              {renderChildren(child.children)}
            </a>
          );
        case 'h1':
          return <h1 key={index}>{renderChildren(child.children)}</h1>;
        case 'h2':
          return <h2 key={index}>{renderChildren(child.children)}</h2>;
        case 'h3':
          return <h3 key={index}>{renderChildren(child.children)}</h3>;
        case 'h4':
          return <h4 key={index}>{renderChildren(child.children)}</h4>;
        case 'h5':
          return <h5 key={index}>{renderChildren(child.children)}</h5>;
        case 'h6':
          return <h6 key={index}>{renderChildren(child.children)}</h6>;
        case 'ol':
          return <ol key={index}>{renderChildren(child.children)}</ol>;
        case 'ul':
          return <ul key={index}>{renderChildren(child.children)}</ul>;
        case 'blockquote':
          return (
            <blockquote key={index}>
              {renderChildren(child.children)}
            </blockquote>
          );
        case 'bold':
        case 'indent':
          return (
            <div style={{ marginLeft: '20px' }} key={index}>
              {renderChildren(child.children)}
            </div>
          );
        case 'upload':
          return (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '10px',
              }}
              key={index}
            >
              <img src={child.value.url} alt="Upload image" />
              <i>{child.value.description}</i>
            </div>
          );
        // case 'upload':
        //   const image = images.find((img) => img.id === child.value.id);
        //   return image ? (
        //     <img src={image.url} alt="Uploaded Content" key={index} />
        //   ) : <span>KHONG LOAD DUOC ANH KHONG HIEU TAI SAO</span>;
        default:
          return <span key={index}>{renderText(child)}</span>;
      }
    });
  };

  return <div>{renderChildren(data)}</div>;
};

export default RichTextDisplay;

import React, { Fragment } from 'react';
import escapeHTML from 'escape-html';
import { Text } from 'slate';

const RichTextConvert = (children) =>
  children.map((node, i) => {
    if (Text.isText(node)) {
      let text = (
        <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />
      );

      if (node.bold) {
        text = <strong key={i}>{text}</strong>;
      }

      if (node.code) {
        text = <code key={i}>{text}</code>;
      }

      if (node.italic) {
        text = <em key={i}>{text}</em>;
      }

      if (node.text === '') {
        text = <br />;
      }

      if (node.underline) {
        text = <u key={i}>{text}</u>;
      }

      if (node.strikethrough) {
        text = <s key={i}>{text}</s>;
      }
      // Handle other leaf types here...

      return <Fragment key={i}>{text}</Fragment>;
    }

    if (!node) {
      return null;
    }

    switch (node.type) {
      case 'h1':
        return <h1 key={i}>{RichTextConvert(node.children)}</h1>;
      case 'h2':
        return <h2 key={i}>{RichTextConvert(node.children)}</h2>;
      case 'h3':
        return <h3 key={i}>{RichTextConvert(node.children)}</h3>;
      case 'h4':
        return <h4 key={i}>{RichTextConvert(node.children)}</h4>;
      case 'h5':
        return <h5 key={i}>{RichTextConvert(node.children)}</h5>;
      case 'h6':
        return <h6 key={i}>{RichTextConvert(node.children)}</h6>;
      case 'blockquote':
        return (
          <blockquote key={i}>{RichTextConvert(node.children)}</blockquote>
        );
      case 'ul':
        return <ul key={i}>{RichTextConvert(node.children)}</ul>;
      case 'ol':
        return <ol key={i}>{RichTextConvert(node.children)}</ol>;
      case 'li':
        return <li key={i}>{RichTextConvert(node.children)}</li>;
      case 'link':
        return (
          <a href={escapeHTML(node.url)} key={i}>
            {RichTextConvert(node.children)}
          </a>
        );

      default:
        return <p key={i}>{RichTextConvert(node.children)}</p>;
    }
  });

export default RichTextConvert;

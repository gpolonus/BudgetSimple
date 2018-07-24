import React from 'react';
import './Tag.css';
import NonBreakingSpaces from '../NonBreakingSpaces/NonBreakingSpaces';


export default ({ tag, click, highlighted }) => (
  <div className={`Tag${highlighted ? ' highlighted' : ''}`} onClick={() => click(tag)}>
    <NonBreakingSpaces>
      {tag}
    </NonBreakingSpaces>
  </div>
)

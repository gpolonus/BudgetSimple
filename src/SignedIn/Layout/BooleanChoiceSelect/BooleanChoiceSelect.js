import React from 'react';
import Tag from '../../../components/Tag/Tag';


export default ({ first, second, value, change }) => {

  const changeWrapper = (picked) => {
    if(picked !== value) {
      change(picked);
    }
  }

  return (
    <div className="BooleanChoiceSelect">
      <Tag tag={first} click={changeWrapper} highlighted={value === first} />
      <Tag tag={second} click={changeWrapper} highlighted={value === second} />
    </div>
  );
}

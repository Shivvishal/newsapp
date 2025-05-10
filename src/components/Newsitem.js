import React from 'react';
import Button from './Button';

const Newsitem = (props) => {
  let { title, description, imgUrl, newsUrl, author, date, source } = props;
  
  return (
    <div className="my-5">
      {/* Only one <a> tag wrapping the whole content */}
      <a href={newsUrl} className="link-offset-2 link-underline link-underline-opacity-0" target="_blank" rel="noopener noreferrer">
        <div className="card mx-4" style={{ height: "37rem", borderRadius: '31px', background: 'rgb(204, 213, 220)', boxShadow: '23px 23px 46px #828282,-23px -23px 46px #ffffff' }}>
          <img 
            src={imgUrl || "https://e3.365dm.com/25/04/1600x900/skynews-hsbc-bank-barclays_6878916.jpg?20250407145609"} 
            className="card-img-top" 
            height={"250px"} 
            alt={title || 'News Image'} 
          />
          <div className="card-body">
            <h5 className="card-title">
              {title}....
              <br />
              <span className="badge text-bg-success my-1">{source}</span>
            </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-danger">
                By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}
              </small>
            </p>
            {/* Button link is now part of the same <a> tag */}
            <Button />
          </div>
        </div>
      </a>
    </div>
  );
};

export default Newsitem;

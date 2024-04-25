//file: Card.js

import React, { useState, useEffect } from 'react';
import './Card.css';
import more from './more.png';
import { Link } from 'react-router-dom';
import { supabase } from '../client';

const Card = (props) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await supabase
          .from('Posts')
          .select()
          .eq('id', props.id);

        // Check if data is not null or undefined
        if (data && data.length > 0) {
          setCount(data[0].betCount);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [props.id]);

  const handleUpdateCount = async () => {
    try {
      // Increment the count locally
    setCount((prevCount) => prevCount + 1);
    //update the count in the database
      const { data } = await supabase
        .from('Posts')
        .update({ betCount: count + 1 })
        .eq('id', props.id);

      // Check if data is not null or undefined
      if (data && data.length > 0) {
        setCount(data[0].betCount);
      }
    } catch (error) {
      console.error('Error updating count:', error);
    }
  
  };

  return (
    <div className="Card">
      <Link to={'edit/' + props.id}>
        <img className="moreButton" alt="edit button" src={more} />
      </Link>
      <h2 className="title">{props.title}</h2>
      <h3 className="author">{'by ' + props.author}</h3>
      <p className="description">{props.description}</p>
      <button className="betButton" onClick={handleUpdateCount}>
        👍 Bet Count: {count}
      </button>
    </div>
  );
};

export default Card;

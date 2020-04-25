import React, { useState } from 'react';
import Head from 'next/head'
import fetch from 'node-fetch'


import { Swipeable, direction } from 'react-deck-swiper';

import classNames from 'classnames';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';

import CardButtons from '../components/CardButtons';
import Card from '../components/Card';

import useStyles from '../src/styles';

export default function Home({opportunities}) {

  const classes = useStyles();

  const [lastSwipeDirection, setLastSwipeDirection] = useState(null);
  const [cards, setCards] = useState(opportunities);

  const handleOnSwipe = (swipeDirection) => {
    if (swipeDirection === direction.RIGHT) {
      setLastSwipeDirection('your right');
    }

    if (swipeDirection === direction.LEFT) {
      setLastSwipeDirection('your left');
    }

    setCards((prev) => prev.slice(1));
  };

  const renderButtons = ({
    right,
    left,
  }) => (
    <CardButtons
      right={right}
      left={left}
    />
  );

  return (
    <div className="container">
      <Head>
        <title>Torre Swiper</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Welcome to <a href="https://nextjs.org">Torre Swiper!</a>
        </h1>

        <p className="description">
          Get started searching your <br/><code>Dream Job</code>
        </p>

        <Grid container spacing={3} className={classes.centerContent}>
        {
          cards.length > 0 && (
            <Grid item xs={12} className={classNames(classes.marginTop2, classes.centerContent)}>
              {
                lastSwipeDirection
                  ? (
                    <Typography variant="body1">
                      {'Looks like you have just swiped to '}
                      {lastSwipeDirection}
                      ? 🔮
                    </Typography>
                  )
                  : (
                    <Typography variant="body1">
                      Try swiping the card below to Quick Apply!
                    </Typography>
                  )
              }
            </Grid>
          )
        }
        </Grid>

        <Grid item xs={12} className={classNames(classes.marginTop2, classes.centerContent)}>
        {
          cards.length > 0
            ? (
              <Swipeable
                renderButtons={renderButtons}
                onSwipe={handleOnSwipe}
              >
                <Card item={cards[0]} />
              </Swipeable>
            )
            : (
              <Typography variant="body1">
                Looks like you have reached the end here =)
              </Typography>
            )
          }
          </Grid>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #cddc39;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          color: #cddc39;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          background: #27292D;
          color: #ffffff;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  const body = {};

  const res = await fetch('https://search.torre.co/opportunities/_search', {
    method: 'post',
    body: JSON.stringify(body),
    headers: {'Content-Type': 'application/json'}
  })
  const response = await res.json();
  const opportunities = response.results;

  return {
    props: {
      opportunities,
    },
  }
}
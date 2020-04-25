import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import MaterialCard from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import dynamic from 'next/dynamic'

import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

const DateCountdown = dynamic(
  () => import('react-date-countdown-timer'),
  { ssr: false }
)
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  cardMedia: {
    objectFit: 'cover',
    objectPosition: 'top',
    userSelect: 'none',
    pointerEvents: 'none',
  },
  cardHeader: {
    title: "#cddc39"
  },
  members: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  } 
}));

export default function Card({
  item:{
    id,
    objective,
    type,
    organizations,
    locations,
    remote,
    external,
    deadline,
    status,
    compensation,
    skills,
    members,
    questions,
    context
  }
}) {
  const classes = useStyles();
  const typeUpper = type.charAt(0).toUpperCase() + type.substring(1).split('-').join(' ');
  const countDownLocalesPlural = ['y','m','d','h','m','s'];

  return (
    <MaterialCard className={classes.root}>
      <CardHeader
        avatar={
          <Avatar src={organizations[0].picture} aria-label="recipe" className={classes.avatar}>
            {objective[0].toUpperCase()}
          </Avatar>
        }
        title={
          <Typography gutterBottom color="primary" variant="body1" component="h4">
            {objective}
          </Typography>
        }
        subheader={
          <>
            <Typography gutterBottom variant="body1" component="h4">
              {typeUpper}
            </Typography>
            {
              organizations.map((org, index) => <Typography gutterBottom variant="body1" component="h4">
                {org && org.name}
              </Typography>)
            }
            {
              locations.map((loc, index) => <Typography gutterBottom variant="body1" component="h4">
                {loc}
              </Typography>)
            }
            <Typography gutterBottom variant="body1" component="h4">
              <DateCountdown dateTo={deadline} locales_plural={countDownLocalesPlural} mostSignificantFigure="day"/>
            </Typography>
          </>
        }
      />
      <CardActionArea>
        <CardContent>
          {
            compensation ? 
              <Typography gutterBottom variant="body1" component="h3">
                {`${compensation.data.currency} 
                  ${[compensation.data.minAmount, compensation.data.maxAmount].join(' - ')} ${compensation.data.periodicity}`}
              </Typography>
            : 
            <Typography gutterBottom variant="body" component="h4">
              Compensation: To be defined
            </Typography>
          }
          {
            skills.map((skill, index) => <Chip label={`${skill.name} ${skill.experience.split('-')[0]} ${skill.experience.split('-')[2]}`} variant="outlined" />)
          }
          <div className={classes.members}>
          {members.map((member, index) => 
            <Avatar src={member.picture} aria-label="recipe" className={classes.avatar}>
              {member.name[0].toUpperCase()}
            </Avatar>
          )}
          </div>

        </CardContent>
      </CardActionArea>
    </MaterialCard>
  );
}
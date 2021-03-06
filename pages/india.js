import Head from 'next/head'
import Router from 'next/router'
import {useState, useEffect} from 'react'
import NumberFormat from 'react-number-format';
import {Accordion, Card} from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Container from '@material-ui/core/Container'
import ReplyIcon from '@material-ui/icons/Reply';
import OpacityIcon from '@material-ui/icons/Opacity';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const India = () => {
  const classes = useStyles();

  const [stats, handleStats] = useState([]);
  const [dat, setDat] = useState([]);
   const [country, setCountry] = useState([])


  const exam = () => {

    fetch('https://api.covid19india.org/data.json') //data source
         .then(response => response.json())
         .then(res => {
             setDat(res.statewise)
         })
         .catch(error => {
             console.log(error)
         })
  }


    const FetchData = async () => {
       const data = await fetch('https://corona.lmao.ninja/all');
       const stats = await data.json();
       handleStats(stats)
    }

    useEffect(() => {
      FetchData()
      exam()
      }, [])
    useEffect(() => {
      console.log(dat)
      setCountry(dat[0])

    }, [dat])

    const doll = JSON.stringify(country)

  return(
  <div className="container">
    <Head>
      <title>MB | India</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>

      <h1 className="title">
      <ReplyIcon onClick={()=>{Router.push('/')}}/>  All India Covid-19 cases
      </h1>

      <p className="description">
        Stay Home | Stay Safe
      </p>
    <Alert severity="error">Last updated - {country && Object.values(country)[6]}</Alert>
      <div className="grid">
        <a className="card red-card">
          <h3>Confirmed &rarr;</h3>
          <p><NumberFormat thousandSeparator={true} displayType={'text'} thousandsGroupStyle="lakh" value={country && Object.values(country)[1] }/></p>
        </a>

        <a className="card">
          <h3>Active &rarr;</h3>
          <p><NumberFormat thousandSeparator={true} displayType={'text'} thousandsGroupStyle="lakh" value={country && Object.values(country)[0] }/></p>
        </a>

        <a className="card green-card">
          <h3>Recovered &rarr;</h3>
          <p><NumberFormat thousandSeparator={true} displayType={'text'} thousandsGroupStyle="lakh" value={country && Object.values(country)[7]}/></p>
        </a>

        <a className="card black-card">
          <h3>Deaths &rarr;</h3>
          <p>
            <NumberFormat thousandSeparator={true} displayType={'text'} thousandsGroupStyle="lakh" value={country && Object.values(country)[2]}/>
          </p>
        </a>
        <Container>
        <hr/>
          <div className={classes.root}>
         <ExpansionPanel>
           <ExpansionPanelSummary
             expandIcon={<ExpandMoreIcon />}
             aria-controls="panel1a-content"
             id="panel1a-header"
           >
             <Typography className={classes.heading}><b>Today's details</b></Typography>
           </ExpansionPanelSummary>
           <ExpansionPanelDetails>
             <Typography>
                Confirmed cases(Today) : {country && Object.values(country)[3]}
                <br/>
                Recovered(Today) : {country && Object.values(country)[5]}
                <br/>
                Deaths(Today) : {country && Object.values(country)[4]}
             </Typography>
           </ExpansionPanelDetails>
         </ExpansionPanel>
         </div>
         </Container>

      </div>


      <hr/>
      <br/>

    </main>

    <footer>
      <a
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by MB <OpacityIcon/>
      </a>
    </footer>

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
        color: #0070f3;
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
        font-size: 3rem;
      }

      .title,
      .description {
        text-align: center;
      }

      .description {
        line-height: 1.5;
        font-size: 1.2rem;
      }

      code {
        background: #fafafa;
        border-radius: 5px;
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
        flex-basis: 30%;
        padding: 1.2rem;
        text-align: left;
        color: inherit;
        text-decoration: none;
        border: 1px solid #eaeaea;
        border-radius: 10px;
        transition: color 0.15s ease, border-color 0.15s ease;
      }

      .red-card {
        background-color: red;
        color: white;
      }
      .green-card {
        background-color:green;
        color:white;
      }
      .black-card {
        background-color:black;
        color:white;
      }
      .card:hover,
      .card:focus,
      .card:active {
        border-color: #0070f3;
      }

      .card h3 {
        margin: 0 0 1rem 0;
        font-size: 1.2rem;
      }

      .card p {
        margin: 0;
        font-size: 1.2rem;
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
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
  </div>
)
}


export default India;

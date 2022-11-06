import React, {useState, useEffect} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import {Paper} from "@mui/material";
import {Grid, makeStyles} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import Covid19Logo from "./covid19.svg"
import {fetchCountries} from "./api";
import AreaChart from "./AreaChart";


const App = () => {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState(["turkey"]);

    useEffect(() => {
        const fetchCountriesData = async () => {
            const countries = await fetchCountries();
            setCountries(countries)
        }
        fetchCountriesData();
    }, []);

    return (
        <React.Fragment>
            <CssBaseline/>
            <Container maxWidth="lg">
                <Grid container>
                    <img src={Covid19Logo} alt="Covid19 Logo" style={{
                        marginTop: 20,
                        width: 100,
                        height: 100,
                        marginBottom: 20
                    }}/>
                    <FormControl fullWidth style={{
                        margin: "50px auto",
                        width: "50%"
                    }}>
                        <Select
                            value={country}
                            label="Age"
                            onChange={event => (setCountry(event.target.value))}
                        >
                            {
                                countries.map(country => (
                                    <MenuItem value={country.Slug}>{country.Country}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>

                    {/* Chart*/}
                    <Grid item xs={12}>
                        <Paper>
                            <AreaChart country={country}/>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>


    );
};

export default App;

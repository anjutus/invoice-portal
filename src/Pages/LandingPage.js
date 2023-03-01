import { Card, CardContent, CardMedia, Divider, Box, Typography, Grid } from "@mui/material";
import { Container } from "@mui/system";
import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from '../auth/LoginButton';
import SignupButton from '../auth/SignupButton';
export default function LandingPage() {

    const { user, isAuthenticated, isLoading,logout } = useAuth0();

    return (
        <Container maxWidth="xl" sx={{ display: "-ms-flexbox" }}>
            <Grid container direction="row" justifyContent="center" alignItems="center" spacing={3}>
                <Grid item xs={12} xl={12} sx={{ display: 'flex'}} justifyContent="center">
                    {/* <Card sx={{ display: 'flex',maxWidth: '100%',}}>
                        <CardMedia component="img"
                            height="500"
                            sx={{objectFit: "fill" }}
                            image="https://invoiceportalmedia.s3.us-east-2.amazonaws.com/scott-graham-5fNmWej4tAA-unsplash+(1).jpg">
                        </CardMedia>
                    </Card> */}
                    <img height={400} width={900} sx={{objectFit: "fill" }} src="https://invoiceportalmedia.s3.us-east-2.amazonaws.com/scott-graham-5fNmWej4tAA-unsplash+(1).jpg"/>
                </Grid>
                <Divider orientation="vertical" />
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Typography data-testid="Welcome-text" variant="h6">
                            Welcome please login to Invoice portal
                        </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                {!isAuthenticated && (
                        
                            <LoginButton></LoginButton>
                       
                    )}
                </Grid>
                <Divider orientation="vertical" />
                
            </Grid>
            <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1} paddingTop={3}>
            <Grid item xs={6} >
                <Typography variant="h6" textAlign={"right"}>
                            New User ?
                        </Typography>
                        </Grid>
                        <Grid item xs={6} textAlign={"left"}> 
                {!isAuthenticated && (
                        
                           <SignupButton></SignupButton>
                       
                    )}
                </Grid>
                </Grid>
        </Container>
    )
}
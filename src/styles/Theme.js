import React from 'react'
import { ThemeProvider } from "styled-components";

const theme = {
    colorPrimary: "#171B27",
    colorPrimaryLight: "#424E70",
    colorBlack: "#090A0C",
    colorGreyDark: "#373B3E",
    colorGreyLight: "#6B7076",
    colorWhite: "#F1F1F5",
}

class Theme extends React.Component {
    render(){
        return (
            <ThemeProvider theme={theme}>
                {this.props.children}
            </ThemeProvider>
        )
    }
}

export default Theme;
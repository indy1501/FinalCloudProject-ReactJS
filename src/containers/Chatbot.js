import React, { Component } from "react";
import { ChatBot } from 'aws-amplify-react';

class Chatbot extends Component {
    state={
        on:false,
    }

    toggle=()=>{
        this.setState({

            on:!this.state.on
        })
    }
    handleComplete(err, confirmation) {
        if (err) {
          alert('Bot conversation failed')
          return;
        }
        //alert('Success: ' + JSON.stringify(confirmation, null, 2));
        return 'Event booked. Thank you! What would you like to do next?';
    }
    render() {
        return(
            <div>
                {
                    this.state.on && (
                        <ChatBot
                title="My React Bot"
                botName="EventBookingBot"
                welcomeMessage="Welcome, how can I help you today?"
                onComplete={this.handleComplete.bind(this)}
                voiceEnabled={true}
                clearOnComplete={true}
            />
                    )
                }
                <button onClick={this.toggle}>Chat Bot</button>
            </div>
        );
    }
}

export default Chatbot;
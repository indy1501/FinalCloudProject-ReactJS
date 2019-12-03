import React, { PureComponent } from 'react'
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { eventService } from '../../services/EventService';
import { Link } from 'react-router-dom';

class CapturePhoto extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            uploadResult:"No photo uploaded" 
        }
        this.onTakePhoto = this.onTakePhoto.bind(this)
    }
    onTakePhoto(dataUri) {
        // Do stuff with the dataUri photo...
        console.log('takePhoto', dataUri);
        fetch(dataUri)
            .then(res => res.blob())
            .then(blob => {
                // Upload
                // fetch('upload', {method: 'POST', body: fd})
                let userEmail = sessionStorage.getItem("userEmail")
                eventService.uploadPhoto(blob,userEmail)
                .then(json => {
                    console.log(json);
                    this.setState({
                        uploadResult: "Photo Uploaded successfully"
                    }); 
                })
                .catch(reason => {
                    console.log(reason);
                });
            })
        
    }

    render() {
        return (
            <div>
                <div style={{ margin: "30px" }}>
                    <Link to="/UserEventView"> Go Back</Link>
                </div>
                <h3 className="text-center" style={{marginTop:30, color: "red"}}>Upload your image by using the camera button</h3>
                <div className="App" style={{marginTop:30}}>
                    <Camera
                        onTakePhoto={(dataUri) => { this.onTakePhoto(dataUri); }}
                    />
                    <h5 className="text-center" style={{marginTop:10}}>{this.state.uploadResult}</h5>
                </div>
            </div>
        )
    }
}

export default CapturePhoto
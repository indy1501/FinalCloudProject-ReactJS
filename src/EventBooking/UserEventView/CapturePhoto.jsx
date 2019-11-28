import React, { PureComponent } from 'react'
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { eventService } from '../../services/EventService';

class CapturePhoto extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            uploadResult:""
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
                        uploadResult: "File Uploaded successfully"
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
                <div className="App">
                    <Camera
                        onTakePhoto={(dataUri) => { this.onTakePhoto(dataUri); }}
                    />
                </div>
            </div>
        )
    }
}

export default CapturePhoto
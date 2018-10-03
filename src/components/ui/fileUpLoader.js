import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FileUploader from 'react-firebase-file-uploader';
import CircularProgress from '@material-ui/core/CircularProgress';
import { firebase } from '../../firebase';

class FileUpLoader extends Component {
  state = {
    name: '',
    isUpLoading: false,
    fileURL: '',
  };

  static propTypes = {
    defaultImgName: PropTypes.string.isRequired,
    defaultImg: PropTypes.string.isRequired,
    dir: PropTypes.string.isRequired,
    filename: PropTypes.func.isRequired,
    resetImage: PropTypes.func.isRequired,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.defaultImg) {
      return {
        name: props.defaultImgName,
        fileURL: props.defaultImg,
      };
    }

    return null;
  }

  handleUploadStart = () => {
    this.setState({
      isUpLoading: true,
    });
  };

  handleUploadSuccess = fileName => {
    this.setState({
      name: fileName,
      isUpLoading: false,
    });

    firebase
      .storage()
      .ref(this.props.dir)
      .child(fileName)
      .getDownloadURL()
      .then(url => {
        this.setState({
          fileURL: url,
        });
      });

    this.props.filename(fileName);
  };

  handleUploadError = () => {
    this.setState({
      isUpLoading: false,
    });
  };

  uploadAgain = () => {
    this.setState({
      name: '',
      isUpLoading: false,
      fileURL: '',
    });

    this.props.resetImage();
  };

  render() {
    const { fileURL, isUpLoading, name } = this.state;
    const { tag, dir } = this.props;
    const firebaseRef = firebase.storage().ref(dir);
    return (
      <div>
        {!fileURL ? (
          <div>
            <div className="label_inputs">{tag}</div>
            <FileUploader
              accept="image/*"
              name="image"
              storageRef={firebaseRef}
              randomizeFilename
              onUploadStart={this.handleUploadStart}
              onUploadSuccess={this.handleUploadSuccess}
              onUploadError={this.handleUploadError}
            />
          </div>
        ) : null}

        {isUpLoading ? (
          <div
            className="progress"
            style={{ textAlign: 'auto', margin: '30px 0' }}
          >
            <CircularProgress style={{ color: '#98c6e9' }} thickness={7} />
          </div>
        ) : null}
        {fileURL ? (
          <div className="image_upload_container">
            <img style={{ width: '100%' }} src={fileURL} alt={name} />
            <div className="remove" onClick={this.uploadAgain}>
              Remove
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default FileUpLoader;

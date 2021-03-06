import { Component } from "react";
import { CgGoogle } from "react-icons/cg";
import { MdPhotoCamera } from "react-icons/md";
import ProfilePicModal from "./ProfilePicModal";

const apiUrl = process.env.REACT_APP_API_URL;
class Header extends Component {
  state = {
    isEditingPic: false,
  };

  toggleModal = () => {
    this.setState({ isEditingPic: !this.state.isEditingPic });
  };

  render() {
    return (
      <div id="headerComp">
        <div
          id="upperPart"
          style={{
            backgroundImage: "url(/assets/images/back1.jpg)",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <img
            id="profilePic"
            src={this.props.profileData.image}
            alt={"rofile of " + this.props.profileData.name}
          />
          {this.props.isMe === "me" && (
            <span id="profilePhotoSpan">
              <MdPhotoCamera
                id="profilePhotoIcon"
                onClick={() => this.toggleModal()}
              />
            </span>
          )}

          <div id="message">
            <button id="button">Message</button> <span>...</span>
          </div>
        </div>
        <div id="lowerPart">
          <div id="leftSide">
            <p id="name">
              <span style={{ marginRight: "10px" }}>
                {this.props.profileData.name}
              </span>
              <span>{this.props.profileData.surname}</span>
            </p>
            <span>. 3rd</span>
            <br></br>
            <p id="jobTitle">{this.props.profileData.bio}</p>
            <ul>
              <li>{this.props.profileData.area}</li>
              <li>.</li>
              <li>150 connections</li>
              <li>.</li>
              <li>
                <a
                  href={
                    apiUrl + "/api/profile/60c9fddd35e957371cfa7adc/cv-download"
                  }
                >
                  Download CV
                </a>
              </li>
            </ul>
          </div>
          <div id="rightSide">
            <img
              src="/assets/images/strivelogo.jpg"
              alt="company logo"
              height="32px"
            />
            <p>Strive School</p>
          </div>
        </div>
        <ProfilePicModal
          isEditingPic={this.state.isEditingPic}
          toggleModal={this.toggleModal}
        />
      </div>
    );
  }
}

export default Header;

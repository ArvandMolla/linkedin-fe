import { Button, Nav } from "react-bootstrap";
import "../index.css";
import ProfileImg from "./ProfileImg.jpeg";
import React from "react";
import { withRouter } from "react-router-dom";

class LateralProfiles extends React.Component {
  state = {
    profile: {},
    isLoading: true,
    page: 1,
  };

  componentDidMount = async () => {
    this.fetchExp();
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (this.state.page !== prevState.page) {
      this.fetchExp();
    }
  };

  fetchExp = async () => {
    try {
      const backEndUrl = process.env.REACT_APP_API_URL;
      let response = await fetch(
        `${backEndUrl}/api/profile/?limit=${this.state.page * 5}&offset=0
        }`
      );
      // console.log(response);
      if (response.ok) {
        let data = await response.json();
        this.setState({
          profile: data,
          isLoading: false,
        });
      } else {
        console.log("houston we got an error");
        this.setState({ isError: true, isLoading: false });
      }
    } catch (error) {
      console.log(error);
      this.setState({ isError: true, isLoading: false });
    }
  };

  addPageToState = async () => {
    this.setState({ page: this.state.page + 1 });
  };

  render() {
    return (
      <div className="lateral-container">
        <div id="lateral-profile-main-container">
          {!this.state.isLoading && (
            <h3 id="lateral-profile-section-title" className="mb-4 mt-2">
              Profiles you may know ({this.state.profile.total})
            </h3>
          )}
          {!this.state.isLoading &&
            this.state.profile.data.map((item) => (
              <div key={item._id} id="lateral-profile" className="d-flex mt-3">
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ display: "inline" }}
                >
                  <img
                    src={item.image}
                    alt=""
                    id="lateral-profile-user-image"
                  />
                </div>

                <div
                  style={{ display: "inline" }}
                  id="lateral-profile-info-box"
                >
                  <h3 id="lateral-profile-username">
                    <Nav.Link
                      id="lateral-profile-username-link"
                      onClick={() =>
                        this.props.history.push(`/userprofile/${item._id}`)
                      }
                    >
                      {item.name} {item.surname}
                    </Nav.Link>
                    {item.name}

                    <span id="lateral-profile-name-grade-separator"> - </span>
                    <span>1°</span>
                  </h3>
                  <p id="lateral-profile-user-title">{item.title}</p>
                  <Button variant="primary" id="later-profile-follow-button">
                    Follow
                  </Button>
                </div>
              </div>
            ))}
        </div>
        <Button
          variant="primary"
          id="show-more"
          onClick={() => this.addPageToState()}
        >
          Show More
        </Button>
      </div>
    );
  }
}

export default withRouter(LateralProfiles);

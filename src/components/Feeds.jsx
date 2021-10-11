import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import { IoMdGlobe } from "react-icons/io";
import { FeedsDate } from "./FeedsDate.js";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots, FaHandHoldingHeart } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { FiSend } from "react-icons/fi";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FcLike } from "react-icons/fc";
import { HiLightBulb } from "react-icons/hi";
import { GiShakingHands } from "react-icons/gi";

class Feeds extends React.Component {
  state = {
    posts: [],
    isLoading: true,
    offset: 1,
    urlParams: "/post?limit=5&offset=0",
  };

  componentDidMount = async () => {
    this.fetchPosts();
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (this.state.urlParams !== prevState.urlParams) {
      this.fetchPosts();
    }
  };

  fetchPosts = async () => {
    try {
      const backEndUrl = process.env.REACT_APP_API_URL;
      let response = await fetch(`${backEndUrl}/api/${this.state.urlParams}`);

      if (response.ok) {
        let data = await response.json();
        console.log(data);

        this.setState({
          posts: data,
          isLoading: false,
        });
      } else {
        console.log("Error while getting response");
        this.setState({ isError: true, isLoading: false });
      }
    } catch (error) {
      console.log(error);
      this.setState({ isError: true, isLoading: false });
    }
  };

  setUrlParams = (e) => {
    this.setState({
      ...this.state,
      urlParams: e.target.id,
    });
  };
  render() {
    return (
      <>
        {!this.state.isLoading &&
          this.state.posts.data.map((post) => (
            <Container className="feeds-main-container" key={post._id}>
              <BiDotsHorizontalRounded className="feeds-main-dots" />
              <Row>
                <Col sm={1}>
                  <img
                    className="feeds-user-image"
                    src={post.profile.image}
                    alt=""
                  />
                </Col>
                <Col sm={8} className="mr-auto">
                  <Link className="feeds-profile-username-link">
                    {post.profile.name} {post.profile.surname}
                  </Link>

                  <div className="feeds-user-text text-muted">
                    {post.profile.title}
                    <div>
                      {FeedsDate(post.createdAt)}{" "}
                      <IoMdGlobe className="feeds-icons" />
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <div className="feeds-user-post mt-3 mb-5">"{post.text}"</div>
                {post.postImage && (
                  <img
                    src={post.postImage}
                    className="feeds-post-image"
                    alt="..."
                  />
                )}
              </Row>
              <Row>
                <hr></hr>
                <span>
                  <span className="feeds-group-icons-like">
                    <AiOutlineLike className="feeds-icons-bottom" />{" "}
                    <span>like</span>
                  </span>
                  <div className="feeds-like-reactions">
                    <span className="feeds-heart-style ">
                      <FcLike />
                    </span>
                    <span className="feeds-heart-hand-style">
                      <FaHandHoldingHeart />
                    </span>
                    <span className="feeds-bulb-style">
                      <HiLightBulb />
                    </span>
                    <span className="feeds-hands-style">
                      <GiShakingHands />
                    </span>
                  </div>
                  <span className="feeds-group-icons">
                    <FaRegCommentDots className="feeds-icons-bottom" />
                    <span className="text-comment">comment</span>
                  </span>
                  <span className="feeds-group-icons">
                    <RiShareForwardLine className="feeds-icons-bottom" />{" "}
                    <span>share</span>{" "}
                  </span>
                  <span className="feeds-group-icons">
                    <FiSend className="feeds-icons-bottom" /> <span>send</span>
                  </span>
                </span>
              </Row>
            </Container>
          ))}
        <div className="button-container">
          {!this.state.isLoading && (
            <>
              {
                <Button
                  className={
                    this.state.posts.links.first
                      ? "pagination-enabled"
                      : "pagination-disabled"
                  }
                  id={this.state.posts.links.first}
                  onClick={(e) => this.setUrlParams(e)}
                >
                  First
                </Button>
              }
              {
                <Button
                  className={
                    this.state.posts.links.prev
                      ? "pagination-enabled"
                      : "pagination-disabled"
                  }
                  id={this.state.posts.links.prev}
                  onClick={(e) => this.setUrlParams(e)}
                >
                  Prev
                </Button>
              }
              {
                <Button
                  className={
                    this.state.posts.links.next
                      ? "pagination-enabled"
                      : "pagination-disabled"
                  }
                  id={this.state.posts.links.next}
                  onClick={(e) => this.setUrlParams(e)}
                >
                  Next
                </Button>
              }
              {
                <Button
                  className={
                    this.state.posts.links.last
                      ? "pagination-enabled"
                      : "pagination-disabled"
                  }
                  id={this.state.posts.links.last}
                  onClick={(e) => this.setUrlParams(e)}
                >
                  Last
                </Button>
              }
            </>
          )}
        </div>
      </>
    );
  }
}

export default Feeds;

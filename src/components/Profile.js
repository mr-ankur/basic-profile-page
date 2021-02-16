import React, { Component } from 'react'
import axios from 'axios'
import { Container, Row, Col } from "react-grid";
import DataLabel from './DataLabel'

axios.defaults.headers.common["Content-Type"] = "application/json"; 
axios.defaults.headers.common["Authorization"] = "0NLxYYQIUJ6TNXrG7hQN"; 
axios.defaults.headers.common["language"] = "hi"; 

export default class Profile extends Component {
    state={
        profileData: null
    }
    componentDidMount(){
        axios
          .get(
            "http://pandora.unihyr.com/pandora-service/v1/candidate/0f8f0fe1-84ae-43ee-b8d2-1f68af34b614"
          )
          .then((response) => {
            this.setState({ profileData: response.data});
          });
    }
    render() {
        const profileData = this.state.profileData
        var skills,locations
        this.state.profileData && this.state.profileData.candidateSkills && this.state.profileData.candidateSkills.map(x => x.skill.skillName).map((x,i)=> { skills = i==0 ? x : skills+", "+x})
        this.state.profileData && this.state.profileData.candidateLocations && this.state.profileData.candidateLocations.map(x => x.location.locationName).map((x,i)=> { locations = i==0 ? x : locations+", "+x})
        console.log(333, profileData)
        return (
          <div>
            {profileData && (
              <Container>
                <h3>Candidate Details</h3>
                <Row>
                  <Col xs={12} md={8} lg={8}>
                    <Row>
                      <Col xs={12} sm={4}>
                        <h4>Profile Photo</h4>
                        <img
                          style={{
                            width: "200px",
                            height: "300px",
                          }}
                          src={profileData.photoS3Url}
                          alt={profileData.fullName}
                        ></img>
                      </Col>
                      <Col xs={12} sm={8}>
                        <Row style={{ marginTop: "3rem" }}>
                          <Col xs={12}>
                            <DataLabel
                              text1={"Name"}
                              text2={profileData.fullName}
                            />
                          </Col>
                          <Col xs={12}>
                            <DataLabel
                              text1={"DOB"}
                              text2={profileData.dateOfBirth}
                            />
                          </Col>
                          <Col xs={12}>
                            <DataLabel
                              text1={"Aadhar Number"}
                              text2={profileData.aadharNumber}
                            />
                          </Col>
                          <Col xs={12}>
                            <DataLabel
                              text1={"Gender"}
                              text2={profileData.gender}
                            />
                          </Col>
                          <Col xs={12}>
                            <DataLabel text1={"Location"} text2={locations} />
                          </Col>
                          <Col xs={12}>
                            <DataLabel
                              text1={"Total Experience"}
                              text2={
                                parseInt(
                                  profileData.candidateExperience[0]
                                    .experienceInMonth / 12
                                ) +
                                " Years, " +
                                (profileData.candidateExperience[0]
                                  .experienceInMonth %
                                  12) +
                                " Months"
                              }
                            />
                          </Col>
                          <Col xs={12}>
                            <DataLabel
                              text1={"Previous Experience"}
                              text2={
                                profileData.candidateExperience[
                                  profileData.candidateExperience.length - 1
                                ].designation +
                                ", " +
                                profileData.candidateExperience[
                                  profileData.candidateExperience.length - 1
                                ].employerName
                              }
                            />
                          </Col>
                          <Col>
                            <DataLabel text1={"Skills"} text2={skills} />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "1rem" }}>
                      <Col xs={12} sm={6}>
                        <h4>Aadhar Front</h4>
                        <img
                          style={{ width: "200px", height: "100px" }}
                          src={profileData.aadharS3Url}
                          alt={profileData.fullName}
                        ></img>
                      </Col>
                      <Col xs={12} sm={6}>
                        <h4>Aadhar Back</h4>
                        <img
                          style={{ width: "200px", height: "100px" }}
                          src={profileData.aadharS3BackUrl}
                          alt={profileData.fullName}
                        ></img>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={12} md={4} lg={4} style={{ textAlign: "center" }}>
                    <Row>
                      {profileData.introVideoUrl && (
                        <div>
                          <h4>Introduction Video</h4>
                          <video
                            controls
                            style={{ width: "100%", height: "300px" }}
                          >
                            <source
                              src={profileData.introVideoUrl}
                              type="video/mp4"
                            />
                            Sorry, your browser doesn't support embedded videos.
                          </video>
                        </div>
                      )}
                    </Row>
                    <Row style={{ marginTop: "1rem", marginLeft: "10px" }}>
                      <h4>Resume Link</h4>
                      <a
                        href="http://www.example.com"
                        style={{ padding: "2rem" }}
                      >
                        {profileData.fullName + " Resume"}
                      </a>
                    </Row>
                  </Col>
                </Row>
              </Container>
            )}
          </div>
        );
    }
}

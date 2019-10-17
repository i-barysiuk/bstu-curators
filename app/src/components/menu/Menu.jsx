import React from "react";
import { connect } from "react-redux";
import { logout } from "../../redux/actions/auth";
import { Upload, Icon, message} from 'antd';
import style from "./style.module.scss";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faFileAlt,
  faSearch,
  faUsers,
  faBell,
  faIdCard
} from "@fortawesome/free-solid-svg-icons";
  
import logoP from "../../assets/images/logos/avatarMax.png";
import logoK from "../../assets/images/logos/curators.png";
import { Popover, Badge, Avatar, Button} from "antd";
import UsersService from "../../services/UsersService";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error(' JPG/PNG !');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class Menu extends React.Component {
  state = {
    loading: false,
  };
  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl => {
        this.setState({
          imageUrl,
          loading: false,
        });
      UsersService.setAvatar(this.state.imageUrl);
      }
      );
    }
  };
  
  render() {
    console.log(this.props.users)
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Загрузить</div>
      </div>
    );
    const { imageUrl } = this.state;
    const content = (
        <div> 
        <p> <Upload 
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
                >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}    
           </Upload></p>
          <p><Button onClick={() => this.props.logout()}>Выход</Button></p>
        </div>
      );

    return (
      <div>
      <div className={style.container}>
        <div className={style.upMenu}>
          <NavLink to="/dashboard">
            <img src={logoK} className={style.logo} alt="logo" />
          </NavLink>
        </div>
        <div className={style.middleMenu}>
          <NavLink
            to="/dashboard/groups"
            className={style.button}
            activeClassName={style.buttonActive}
          >
            <FontAwesomeIcon icon={faUsers} className={style.icon} />
          </NavLink>
          <NavLink
            to="/dashboard/students"
            className={style.button}
            activeClassName={style.buttonActive}
          >
            <FontAwesomeIcon icon={faIdCard} className={style.icon} />
          </NavLink>
          <NavLink
            to="/dashboard/reports"
            className={style.button}
            activeClassName={style.buttonActive}
          >
            <FontAwesomeIcon icon={faFileAlt} className={style.icon} />
          </NavLink>
          <NavLink
            to="/dashboard/events"
            className={style.button}
            activeClassName={style.buttonActive}
          >
            <FontAwesomeIcon icon={faCalendarAlt} className={style.icon} />
          </NavLink>
          <NavLink
            to="/dashboard/search"
            className={style.button}
            activeClassName={style.buttonActive}
          >
            <FontAwesomeIcon icon={faSearch} className={style.icon} />
          </NavLink>
        </div>

        <div className={style.downMenu}>
          <Popover
            placement="rightBottom"
            trigger="click"
            content="button"
            title="Title"
          >
            <Badge count={1} dot>
              <FontAwesomeIcon icon={faBell} className={style.bell} />
            </Badge>
          </Popover>
          <Popover
            placement="rightBottom"
            trigger="click"
            content={content}
            title="Профиль"
          >
            <Avatar src={this.props.users && this.props.users.profile && this.props.users.profile.imageBase64} className={style.avatar} />
          </Popover>
        </div>
      </div>
      </div>
    );
  }
}
const mapStateToProps = ({ auth, users }) => ({ auth, users });
const mapDispatchToProps = {
  logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);

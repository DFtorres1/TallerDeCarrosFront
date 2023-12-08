import {
  LoginOutlined,
  LogoutOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = {
  label: React.ReactNode;
  key: React.Key;
  icon?: React.ReactNode;
  child?: String;
};

const items: MenuItem[] = [
  {
    label: "Registrar entrada",
    key: "1",
    icon: <LoginOutlined />,
    child: "/registerin",
  },
  {
    label: "Lista de espera",
    key: "2",
    icon: <UnorderedListOutlined />,
    child: "/waitlist",
  },
  {
    label: "Registro salidas",
    key: "3",
    icon: <LogoutOutlined />,
    child: "/registerout",
  },
  {
    label: "Gestor de empleados",
    key: "4",
    icon: <UserOutlined />,
    child: "/employeemanager",
  },
];

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentPath, setCurrentPath] = useState<String>();

  const navigate = useNavigate()

  useEffect(() => {
    navigate(`${currentPath}`)
  },[currentPath])

  const handleCurrentPath = (value: String) => {
    const item = items.find((item) => item.key == value);
    setCurrentPath(item?.child);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          style={{ fontSize: "16px" }}
          theme="dark"
          mode="inline"
          items={items}
          onSelect={(value) => handleCurrentPath(value.key)}
        />
      </Sider>
      <Layout>
        <Content style={{ minHeight: "100vh" }}>
          <Header style={{ paddingLeft: "40", background: "#213547", color: "aliceblue", fontSize: "30px" }} >Taller de carros</Header>
            <div style={{ padding: "25px", minHeight: "90vh" }}>
              <Card>{children}</Card>
            </div>
          <Footer
            style={{
              textAlign: "center",
              background: "#213547",
              color: "aliceblue",
              position: "sticky",
              display: "flex",
              justifyContent: "center",
              bottom: 0,
            }}
          >
            Creado por Daniel Torres ©2023
          </Footer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default PageLayout;

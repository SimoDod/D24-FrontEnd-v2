import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { fetchUserThunk } from "../../../store/thunks/auth/fetchUserThunk";
import Navigation from "../Navigation/Navigation";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const userRole = useAppSelector((state) => state.auth.user?.role);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserThunk());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-grow">
        <Outlet />
      </div>
      <footer className="footer footer-center bg-base-300 text-base-content p-3 mt-auto">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            Simeon Dodov
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Layout;

/* const AppLayout = () => {
  const userRole = useAppSelector((state) => state.auth.user?.role);
  const items = useMenuItems(userRole);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserThunk());
  }, [dispatch]);

  return (
    <>
      <FloatButtonGroup />
      <Layout>
        <Header className={classes.header}>
          <Text className={classes.headerLogo}>D24</Text>
          <Menu
            mode="horizontal"
            className={classes.menu}
            items={items}
            selectedKeys={[localStorage.getItem(menuItemKey) || ""]}
            overflowedIndicator={<Button icon={<MenuOutlined />} />}
          />
        </Header>
        <Content className={classes.content}>
          <Outlet />
        </Content>
        <Footer className={classes.footer}>
          <Text>D24 ©{new Date().getFullYear()} Created by Simeon Dodov</Text>
        </Footer>
      </Layout>
    </>
  );
}; */

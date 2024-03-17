import styled from '@emotion/styled';

interface AppLayoutProps {
    children: React.ReactNode
}

const CenteredContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Optional: Set minimum height for vertical centering */
`;

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    return (
        <CenteredContent>
            {children}
        </CenteredContent>
    );
}

export default AppLayout;

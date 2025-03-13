import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';

import Button from '@/components/ui/button/button';
import { Modal } from '@/components/ui/modal';
import { useDisclosure } from '@/hooks/use-disclosure';
import { getSampleData } from '@/features/sample/api/get-sample-data';

const DashboardRoute = () => {
    const { isOpen, open, close } = useDisclosure();

    const { data, isLoading, error } = useQuery({
        queryKey: ['sample-data'],
        queryFn: getSampleData,
    });

    if (isLoading) return <div>Loading...</div>;

    if (error) return <div>Error loading data: {error.message}</div>;

    return (
        <Container>
            Dashboard
            <h2>Data from Django API:</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <Button onClick={open}>Open Modal</Button>
            <Modal isOpen={isOpen} onClose={close}>
                <div>Hello I'm a modal</div>
            </Modal>
        </Container>
    );
};

export default DashboardRoute;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

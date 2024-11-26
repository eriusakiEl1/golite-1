import React from 'react';
import { Modal, Box, Typography, Grid, Button } from '@mui/material';

const TeamModal = ({ isOpen, onClose }) => {
    const teamMembers = [
        {
            name: 'Andrade Ramírez Roberto Carlos',
            img: '/img_integrantes/robert.jpeg',
        },
        {
            name: 'Moya Zamarripa Lalo',
            img: '/img_integrantes/lalo.jpeg',
        },
        {
            name: 'Ruelas Aguirre Dylan',
            img: '/img_integrantes/dylan.jpeg',
        },
        {
            name: 'Urbina Zarate Sergio',
            img: '/img_integrantes/sergio.jpeg',
        },
    ];

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: '#5a7a84',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    color: '#fff',
                }}
            >
                <Typography variant="h6" component="h2" gutterBottom>
                    Fundadores de GoLite
                </Typography>
                {teamMembers.map((member, index) => (
                    <Grid container spacing={2} alignItems="center" key={index}>
                        <Grid item>
                            <Box
                                sx={{
                                    width: 50,
                                    height: 50,
                                    overflow: 'hidden',
                                    borderRadius: '50%',
                                    border: '2px solid #fff',
                                }}
                            >
                                <img
                                    src={member.img}
                                    alt={member.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </Box>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1" gutterBottom>
                                {member.name}
                            </Typography>
                        </Grid>
                    </Grid>
                ))}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onClose}
                    sx={{ mt: 2 }}
                >
                    Cerrar
                </Button>
            </Box>
        </Modal>
    );
};

export default TeamModal;

import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const DeliveryInfoSkeleton = () => {
    return (
        <Box
            padding="   40px"
            component="div"
            sx={(theme) => ({
                width: "100%",
                height: "100%",
            })}
        >
            <Container maxWidth="xl">
                <Box width={"100%"} display={{lg:'block',md:'block',sm:'none',xs:'none',xxs:'none'}}>
                    <Skeleton
                        variant="rectangular"
                        sx={{
                            height: "77.46px",
                            width: "170px", borderRadius: 0, "&.MuiSkeleton-root": {
                                backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                "::after": {
                                    background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                }
                            }
                        }}
                    />
                </Box>
                <Stack direction='row' mt={2} spacing={1}
                >
                    <Box>
                        <Skeleton
                            variant="rectangular"
                            sx={{
                                height: "20.8px",
                                width: "130px", borderRadius: 0, "&.MuiSkeleton-root": {
                                    backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                    "::after": {
                                        background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                    }
                                }
                            }}
                        />
                    </Box>
                    <Box >
                        <Skeleton
                            variant="rectangular"
                            sx={{
                                height: "20.8px",
                                width: "130px", borderRadius: 0, "&.MuiSkeleton-root": {
                                    backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                    "::after": {
                                        background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                    }
                                }
                            }}
                        />
                    </Box>
                    <Box display={{lg:'block',md:'block',sm:'none',xs:'none',xxs:'none'}}>
                        <Skeleton
                            variant="rectangular"
                            sx={{
                                height: "20.8px",
                                width: "130px", borderRadius: 0, "&.MuiSkeleton-root": {
                                    backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                    "::after": {
                                        background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                    }
                                }
                            }}
                        />
                    </Box>
                    <Box display={{lg:'block',md:'block',sm:'none',xs:'none',xxs:'none'}}>
                        <Skeleton
                            variant="rectangular"
                            sx={{
                                height: "20.8px",
                                width: "130px", borderRadius: 0, "&.MuiSkeleton-root": {
                                    backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                    "::after": {
                                        background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                    }
                                }
                            }}
                        />
                    </Box>
                </Stack>
                <Box mt={5}>
                    <Skeleton
                        variant="rectangular"
                        sx={{
                            height: "43px",
                            width: "100%", borderRadius: 0, "&.MuiSkeleton-root": {
                                backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                "::after": {
                                    background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                }
                            }
                        }}
                    />
                </Box>

                <Grid container spacing={1} mt={1}>
                    <Grid item lg={3}>
                        <Box>
                            <Skeleton
                                variant="rectangular"
                                sx={{
                                    height: "137px",
                                    width: "137px",
                                    borderRadius: 0, "&.MuiSkeleton-root": {
                                        backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                        "::after": {
                                            background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                        }
                                    }
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid item lg={3}>
                        <Box>
                            <Skeleton
                                variant="rectangular"
                                sx={{
                                    height: "137px",
                                    width: "137px",
                                    borderRadius: 0, "&.MuiSkeleton-root": {
                                        backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                        "::after": {
                                            background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                        }
                                    }
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid item lg={3}>
                        <Box>
                            <Skeleton
                                variant="rectangular"
                                sx={{
                                    height: "137px",
                                    width: "137px",
                                    borderRadius: 0, "&.MuiSkeleton-root": {
                                        backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                        "::after": {
                                            background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                        }
                                    }
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid item lg={3}>
                        <Box>
                            <Skeleton
                                variant="rectangular"
                                sx={{
                                    height: "137px",
                                    width: "137px",
                                    borderRadius: 0, "&.MuiSkeleton-root": {
                                        backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                        "::after": {
                                            background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                        }
                                    }
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>

                <Stack direction='row' spacing={6} p={4}>
                    <Box >
                        <Skeleton
                            variant="rectangular"
                            sx={{
                                height: "40px",
                                width: "100px", borderRadius: 0, "&.MuiSkeleton-root": {
                                    backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                    "::after": {
                                        background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                    }
                                }
                            }}
                        />
                    </Box>
                    <Box >
                        <Skeleton
                            variant="rectangular"
                            sx={{
                                height: "40px",
                                width: "228px", borderRadius: 0, "&.MuiSkeleton-root": {
                                    backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                    "::after": {
                                        background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                    }
                                }
                            }}
                        />
                    </Box>
                </Stack>

                <Box >
                    <Skeleton
                        variant="rectangular"
                        sx={{
                            height: "22px",
                            width: "100%", borderRadius: 0, "&.MuiSkeleton-root": {
                                backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                "::after": {
                                    background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                }
                            }
                        }}
                    />
                </Box>
                <Box mt={1} width="100%">
                    <Skeleton
                        variant="rectangular"
                        sx={{
                            height: "19px",
                            width: "30%", borderRadius: 0, "&.MuiSkeleton-root": {
                                backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                "::after": {
                                    background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                }
                            }
                        }}
                    />
                </Box>

                <Stack direction='row' spacing={2} mt={2}>
                    <Box width="50%">
                        <Skeleton
                            variant="rectangular"
                            sx={{
                                height: "40px",
                                borderRadius: 0, "&.MuiSkeleton-root": {
                                    backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                    "::after": {
                                        background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                    }
                                }
                            }}
                        />
                    </Box>
                    <Box width="50%">
                        <Skeleton
                            variant="rectangular"
                            sx={{
                                height: "40px",
                                borderRadius: 0, "&.MuiSkeleton-root": {
                                    backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                    "::after": {
                                        background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                    }
                                }
                            }}
                        />
                    </Box>
                </Stack>

                <Box mt={1} width="100%">
                    <Skeleton
                        variant="rectangular"
                        sx={{
                            height: "63px",
                            width: "548px", borderRadius: 0, "&.MuiSkeleton-root": {
                                backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                "::after": {
                                    background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                }
                            }
                        }}
                    />
                </Box>

               <Box mt={1} width="100%">
                    <Skeleton
                        variant="rectangular"
                        sx={{
                            height: "48px",
                             borderRadius: 0, "&.MuiSkeleton-root": {
                                backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                "::after": {
                                    background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                }
                            }
                        }}
                    />
                </Box >

                <Box mt={4} width="100%">
                    <Skeleton
                        variant="rectangular"
                        sx={{
                            height: "54px",
                             borderRadius: 0, "&.MuiSkeleton-root": {
                                backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                                "::after": {
                                    background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                                }
                            }
                        }}
                    />
                </Box >
            </Container>
        </Box>
    );
};

export default DeliveryInfoSkeleton;

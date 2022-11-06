import { styled } from '..'

export const HomeContainer = styled('main', {
  display: 'flex',
  marginLeft: 'auto',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  minHeight: 656,
})

export const Product = styled('a', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',
  cursor: 'pointer',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  overflow: 'hidden',

  img: {
    objectFit: 'cover',
  },

  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    position: 'absolute',
    bottom: '0.25rem',
    left: '0,25rem',
    right: '0,25rem',

    width: '90%',
    padding: '2rem',
    borderRadius: 6,
    backgroundColor: 'rgba(0,0,0,0.6)',

    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.2s ease-in-out',

    strong: {
      fontSize: '$lg',
    },

    span: {
      fontSize: '$xl',
      fontWeight: 'bolder',
      color: '$green300',
    },
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    },
  },
})

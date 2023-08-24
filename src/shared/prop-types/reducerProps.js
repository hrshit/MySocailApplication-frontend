import PropTypes from 'prop-types'

const { shape, bool } = PropTypes

export const authProps = shape({
    isFetching: bool,
    isLoggedIn: bool,
    tokens: PropTypes.object,
    loggedInUser: PropTypes.object,
    errorMessage: PropTypes.string,
})

export const messageProps = shape({
    isFetching: bool,
    messages: PropTypes.object,
    errorMessage: PropTypes.string,
})
const genericNotification = {
    title: ' ', //
    message: ' ', // his notification must not be used, instead you need want to spread a new notification object on top of this
    type: 'default',
    insert: 'top',
    container: 'top-right',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
        duration: 1000 * 10,
        onScreen: false,
    },
};

export const successNotification = (title, message) => ({
    ...genericNotification,
    title,
    message,
    type: 'custom-success',
});

export const errorNotification = (title, message) => ({
    ...genericNotification,
    title,
    message,
    type: 'custom-error',
});

export const infoNotification = message => ({
    ...genericNotification,
    title: 'Info',
    message,
    type: 'custom-info',
});

export const warningNotification = (title, message) => ({
    ...genericNotification,
    title,
    message,
    type: 'custom-warning',
});

export const custom_notification_types = [
    {
        htmlClasses: ['notification__item__success'],
        name: 'custom-success',
    },
    {
        htmlClasses: ['notification__item__error'],
        name: 'custom-error',
    },
    {
        htmlClasses: ['notification__item__info'],
        name: 'custom-info',
    },
    {
        htmlClasses: ['notification__item__warning'],
        name: 'custom-warning',
    },
];

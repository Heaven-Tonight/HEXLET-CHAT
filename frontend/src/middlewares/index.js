export const renameChannel = (store) => (next) => (action) => {
  if (action.type !== 'channels/renameChannel') {
    return next(action);
  }
  
  const { id } = action.payload;
  const { channels } = store.getState();
  const { channelsData } = channels;
  
  const payload = channelsData.map((channel) => {
    if (channel.id === id) {
      channel = action.payload;
      return channel;
    }
    return channel;
  });
  return next({ type:'channels/renameChannel', payload });
};


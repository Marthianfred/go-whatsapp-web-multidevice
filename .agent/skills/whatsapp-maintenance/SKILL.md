# Skill: WhatsApp Maintenance
This technical skill is for maintaining the `infrastructure/whatsapp` layer, focusing on `whatsmeow` updates and connectivity issues.

## Tasks
1. **Update Whatsmeow**: Update `go.mau.fi/whatsmeow` to the latest commit.
2. **Client Version Override**: If connectivity fails with `405 Outdated`, explicitly call `whatsmeow.SetDefaultClientVersion` in `InitWaCLI`.
3. **Verify Connection**: Start the Fiber server and verify the client logs for Successful Reconnection or Login.

## Guidelines
- Follow VSA patterns in `infrastructure/`.
- No commenting allowed.
- Use structured logging from `sirupsen/logrus`.

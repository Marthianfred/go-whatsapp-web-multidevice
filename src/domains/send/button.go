package send

type ButtonRequest struct {
	BaseRequest
	Title   string   `json:"title" form:"title"`
	Message string   `json:"message" form:"message"`
	Footer  string   `json:"footer" form:"footer"`
	Buttons []Button `json:"buttons" form:"buttons"`
}

type Button struct {
	ButtonID   string `json:"button_id" form:"button_id"`
	ButtonText string `json:"button_text" form:"button_text"`
}

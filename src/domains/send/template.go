package send

type TemplateRequest struct {
	BaseRequest
	Namespace string `json:"namespace" form:"namespace"`
	TemplateID string `json:"template_id" form:"template_id"`
	Language string `json:"language" form:"language"`
	Title string `json:"title" form:"title"`
	Message string `json:"message" form:"message"`
	Footer string `json:"footer" form:"footer"`
}

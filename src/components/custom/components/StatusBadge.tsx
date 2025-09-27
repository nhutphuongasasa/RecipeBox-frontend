import { Badge } from "@/components/ui/badge"

export const getStatusBadge = (status: string) => {
    switch (status) {
      case "TRENDING":
        return <Badge className="bg-orange-500/20 text-orange-500 border-orange-500/20">Thịnh hành</Badge>
      case "POPULAR":
        return <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/20">Phổ biến</Badge>
      case "NEW":
        return <Badge className="bg-green-500/20 text-green-500 border-green-500/20">Mới</Badge>
      default:
        return null
    }
  }
from django.db import models


class Task(models.Model):
    text = models.TextField()

    def __str__(self):
        return self.text
